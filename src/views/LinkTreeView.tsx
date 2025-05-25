import { useEffect, useState } from "react";
import { DEFAULT_LINKS } from "../lib/config";
import LinkInput from "../components/LinkInput";
import { isURLValid } from "../lib/util";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileEditFields } from "../typings/Form";
import { useClient } from "../lib/Client";
import type { SocialLink, SortableSocialLink, User } from "../typings/app";

export default function LinkTreeView() {
  const apiClient = useClient();
  const qClient = useQueryClient();
  const user = qClient.getQueryData<User>(["user"]);

  const [links, setLinks] =
    useState<(SocialLink & { _index?: number })[]>(DEFAULT_LINKS);
  const [userLinks, setUserLinks] = useState<SortableSocialLink[]>([]);

  useEffect(() => {
    setLinks(
      links.map(
        (actual) => user?.links?.find((l) => l.name == actual.name) || actual
      )
    );
    setUserLinks(user?.links || []);
  }, []);

  useEffect(() => {qClient.setQueryData(["user"], (actual: User)=>{
    return {...actual, links: userLinks};
  });}, [userLinks]);

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
    },
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
    const updated = links.map((link) => {
      if (link.name == name) {
        return { ...link, enabled: !link.enabled };
      }
      return link;
    });

    const selected = updated.find((l) => l.name == name);
    if (selected?.enabled) {
      if (!isURLValid(selected.url)) {
        toast.error("Invalid URL");
        return;
      }

      const id = userLinks.filter((l) => l.id > 0).length + 1;
      if (userLinks.some((l) => l.name == name)) {
        setUserLinks(
          userLinks.map((link) => {
            if (link.name == name) {
              return { ...link, enabled: true, id };
            }
            return link;
          })
        );
      } else {
        const link = {
          id,
          ...selected,
        };
        setUserLinks([...userLinks, link]);
      }
    } else {
      const id = userLinks.findIndex((l) => l.name == name);
      setUserLinks(
        userLinks.map((link) => {
          if (link.name == name) { 
            return { ...link, id: 0, enabled: false };
          } else if (link.id && link.id > id && id > 0) {
            return { ...link, id: link.id - 1 };
          }
          return link;
        })
      );
    }

    setLinks(updated);
  }

  function save() {
    const cached = qClient.getQueryData<User>(["user"]);
    const editData = {links: cached?.links || userLinks};
    console.debug("Saving data", JSON.stringify(editData));
    mutateUser(editData);
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
      <button
        onClick={save}
        className="bg-cyan-300 p-2 text-lg w-full uppercase text-slate-700 rounded-md font-bold"
      >
        Save changes
      </button>
    </div>
  );
}
