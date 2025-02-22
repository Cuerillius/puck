"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import pageConfig from "@config/page.config";
import { deletePage, savePage } from "@lib/database";
import { ReactNode } from "react";

function HeaderActions({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const deletePageHandler = async () => {
    if (confirm("Are you sure you want to delete this page?")) {
      deletePage(path);
    }
  };
  return (
    <div className="flex gap-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={deletePageHandler}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Delete
        </button>

        <a href="/admin" className="text-gray-700 hover:underline">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm">
            To Admin
          </button>
        </a>
        <a href={path} className="text-green-700 hover:underline">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm">
            View Page
          </button>
        </a>
      </div>
      {children}
    </div>
  );
}

export function PageEditor({
  path,
  data,
}: {
  path: string;
  data: Partial<Data>;
}) {
  return (
    <Puck
      config={pageConfig}
      data={data}
      headerPath={path}
      overrides={{
        headerActions: ({ children }) => (
          <HeaderActions path={path} children={children} />
        ),
      }}
      headerTitle={`Editing: ${data.root?.props?.title || ""}`}
      onPublish={async (data) => {
        await savePage(path, data);
      }}
    />
  );
}
