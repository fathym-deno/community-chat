import { Handlers, PageProps } from "$fresh/server.ts";
import { useEffect, useState } from "preact/hooks";
import { ConvoState } from "../../src/services.ts";
import { Action, Input } from "@harbor/atomic";
import { synapticPluginDef } from "../../fresh.config.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render({});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const convoLookup = form.get("convoLookup")?.toString() || "";

    ctx.params.convoLookup = convoLookup;

    const body = new Request("https://unused.com/", {
      ...req,
      method: "POST",
      body: JSON.stringify({
        Title: "",
      }),
    });

    await synapticPluginDef.Handlers.ConvoLookup.POST!(body, ctx);

    const headers = new Headers();
    headers.set("location", `/dashboard/${convoLookup}`);
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
              htmlFor="convoLookup"
            >
              Conversation Lookup
            </label>
          </div>
          <div class="md:w-2/3">
            <Input id="convoLookup" type="text" name="convoLookup" />
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
