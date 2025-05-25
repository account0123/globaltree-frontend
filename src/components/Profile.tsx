import { useQueryClient } from "@tanstack/react-query";
import type { SortableSocialLink, User } from "../typings/app";
import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Profile() {
  const qClient = useQueryClient();
  const user: User | undefined = qClient.getQueryData(["user"]);

  const [enabledLinks, setEnabledLinks] = useState<SortableSocialLink[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10, delay: 10 },
    })
  );

  useEffect(() => {
    setEnabledLinks(user?.links?.filter((l) => l.enabled) || []);
  }, [user]);

  function handleDragEnd(event: DragEndEvent) {
    const activeId = event.active.id;
    const overId = event.over?.id;
    if (!overId) return;
    const [actual, final] = enabledLinks.reduce(
      ([active, over], link, i) => {
        if (link.id == activeId) active = i;
        if (link.id == overId) over = i;
        return [active, over];
      },
      [-1, -1]
    );
    if (actual < 0 || final < 0) return;
    const ordered = arrayMove(enabledLinks, actual, final).map((l, i) => ({...l, id: i + 1}));
    setEnabledLinks(ordered);
    qClient.setQueryData(["user"], (actual: User)=>{
      const disabledLinks = (actual.links?.filter((l) => !l.enabled) || []);
      return {...actual, links: disabledLinks.concat(ordered)}
    });
  }
  return (
    user && (
      <>
        <p className="text-4xl text-slate-100 text-center">{user.name}</p>
        {user.avatar && (
          <img
            src={user.avatar.url}
            className="max-w-[250px] mx-auto rounded-md"
          />
        )}
        <p className="text-xl text-slate-100 text-center">{user.description}</p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="mt-10 flex flex-col gap-5">
            <SortableContext
              items={enabledLinks}
              strategy={verticalListSortingStrategy}
            >
              {enabledLinks.map((link) => (
                <Profile.Link key={`${link.id}-${link.name}`} link={link} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </>
    )
  );
}

Profile.Link = function ({ link }: { link: SortableSocialLink }) {
  let { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="flex items-center gap-1 border-white border-2 rounded-lg px-5 py-2 select-none"
    >
      <img
        src={`/social/icon_${link.name}.svg`}
        className="w-12 h-12 bg-cover"
      />
      <p className="capitalize w-full text-center font-semibold">{link.name}</p>
    </div>
  );
};
