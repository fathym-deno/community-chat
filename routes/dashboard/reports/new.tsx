import { Handlers, PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import { Reports } from "../../../src/services.ts";
import { Report } from "../../../src/ReportManager.ts";
import { Action, Input } from "@harbor/atomic";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const reportLookup = form.get("reportLookup")?.toString() || "";

    await Reports.Save({
      Name: name,
      Lookup: reportLookup,
    } as Report);

    const headers = new Headers();
    headers.set("location", `/dashboard/reports/${reportLookup}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function NewConversation(props: PageProps) {
  return (
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">New Conversation</h1>
      <form method="post" class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="name"
            >
              Report Name
            </label>
          </div>
          <div class="md:w-2/3">
            <Input id="name" type="text" name="name" />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="reportLookup"
            >
              Report Lookup
            </label>
          </div>
          <div class="md:w-2/3">
            <Input id="reportLookup" type="text" name="reportLookup" />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <Action type="submit">Create</Action>
          </div>
        </div>
      </form>
    </div>
  );
}
