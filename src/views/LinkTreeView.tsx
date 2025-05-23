import { useEffect, useState } from "react";
import { DEFAULT_LINKS } from "../lib/config";
import LinkInput from "../components/LinkInput";
import { isURLValid } from "../lib/util";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileEditFields } from "../typings/Form";
import { useClient } from "../lib/Client";
import type { User } from "../typings/app";

export default function LinkTreeView() {

  const apiClient = useClient();
  const qClient = useQueryClient();
  const user = qClient.getQueryData<User>(["user"]);

  const [links, setLinks] = useState(DEFAULT_LINKS);

  useEffect(() => {
    setLinks(links.map((actual) => 
      user?.links?.find(l => l.name == actual.name) || actual
    ));
  }, []);

  const { mutate: mutateUser } = useMutation({
    mutationFn: (data: ProfileEditFields) => apiClient.patchClientUser(data),
    onSuccess: () => {
      toast.success("Links updated");
      qClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  function onUrlChange(name: string, url: string) {
    setLinks((state) =>
      state.map((link) => {
        if (link.name == name) {
          return { ...link, url };
        }
        return link;
      })
    );
  }

  function onSwitch(name: string) {
    setLinks((state) =>
      state.map((link) => {
        if (link.name == name) {
          if (isURLValid(link.url)) {
            return { ...link, enabled: !link.enabled };
          } else {
            toast.error("Invalid %s URL".replace("%s", link.name));
          }
        }
        return link;
      })
    );
  }

  return (
    <div className="text-black space-y-5">
      {links.map((link) => (
        <LinkInput
          key={link.name}
          link={link}
          onUrlChange={onUrlChange}
          onSwitch={onSwitch}
        />
      ))}
      <button onClick={() => mutateUser({ links })} className="bg-cyan-300 p-2 text-lg w-full uppercase text-slate-700 rounded-md font-bold">Save changes</button>
    </div>
  );
}
