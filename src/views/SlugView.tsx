import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { useAnonymousClient } from "../lib/Client";
import PublicProfile from "../components/PublicProfile";

export default function SlugView() {
    const apiClient = useAnonymousClient();
    const { slug } = useParams();
    const { data, error } = useQuery({
        queryKey: ["slug", slug],
        queryFn: () => apiClient.getUserBySlug(slug!),
        retry: 1,
        enabled: slug != undefined,
    });
    if (error) {
        return <Navigate to="/404" />;
    }
    return data && <PublicProfile user={data} />;
}