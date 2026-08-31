"use client";

import MausAvatar from "@/components/MausAvatar";

export default function InstallButton({ installUrl }: { installUrl: string }) {
  return (
    <a className="button button-primary install-button" href={installUrl}>
      <MausAvatar color="green" expression="excited" size={22} />
      Add to OpenMausBot
      <span aria-hidden="true">↗</span>
    </a>
  );
}
