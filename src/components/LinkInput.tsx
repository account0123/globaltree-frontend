import { Switch } from "@headlessui/react";
import type { SocialLink } from "../typings/app";
import { classNames } from "../lib/util";

export default function LinkInput({ link, onUrlChange, onSwitch }: { link: SocialLink, onUrlChange: (name: string, url: string) => void, onSwitch: (name: string) => void }) {
  

  return (
    <div className="bg-white rounded-md p-5 shadow-sm flex items-center gap-3 my-4">
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url(/social/icon_${link.name}.svg)` }}
      ></div>
      <input type="text" name={link.name} value={link.url} className="flex-1 rounded-lg border-gray-100" onChange={(e)=>onUrlChange(e.target.name, e.target.value)} />
      <Switch
        checked={link.enabled}
        onChange={() => onSwitch(link.name)}
        className={classNames(
          link.enabled ? "bg-blue-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            link.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}
