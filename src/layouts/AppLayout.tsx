import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useClient, type Session } from "../lib/Client";
import { useEffect, useState } from "react";
import localforage from "localforage";
import Dashboard from "../views/Dashboard";

export default function AppLayout() {
  const client = useClient();

  // Ready: Session is loaded from local storage
  const [ready, setReady] = useState(false);

  useEffect(() => {
    localforage.getItem<Session>("session").then((session) => {
      if (session) {
        client.session = session;
        client.updateHeaders();
      }
      setReady(true);
    });
  }, []);

  const { data: user, isError } = useQuery({
    queryFn: () => client.getClientUser(),
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: ready
  });

  if (isError) {
    return (<Navigate to="/auth/login" />);
  }
  
  return user && (<Dashboard user={user} />);
}
