"use client";

export default function InstallButton({ installUrl }: { installUrl: string }) {
  return (
    <a className="button button-primary install-button" href={installUrl}>
      <img src="/app-icon.png" width="20" height="20" alt="" />
      Add to OpenMausBot
      <span aria-hidden="true">↗</span>
    </a>
  );
}
