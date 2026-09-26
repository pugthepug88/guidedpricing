import { config, higgsfield } from "@higgsfield/client/v2";

const credentials = process.env.HF_CREDENTIALS;

if (!credentials) {
  console.error(
    "HF_CREDENTIALS is not set. Add it to .env.local in key-id:key-secret format.",
  );
  process.exit(1);
}

config({ credentials });

const terminalFailureStatuses = new Set([
  "failed",
  "canceled",
  "cancelled",
  "moderated",
  "nsfw",
]);

try {
  const result = await higgsfield.subscribe(
    "bytedance/seedance-2.5/text-to-video",
    {
      input: {
        prompt: "A cinematic scene at sunset",
        duration: 5,
        resolution: "720p",
        aspect_ratio: "16:9",
      },
      withPolling: true,
    },
  );

  const status = String(result.status).toLowerCase();

  if (status === "completed") {
    const videoUrl = result.video?.url;

    if (!videoUrl) {
      console.error("Generation completed, but no video URL was returned.");
      process.exit(1);
    }

    console.log(videoUrl);
  } else if (terminalFailureStatuses.has(status)) {
    console.error(`Generation did not succeed. Status: ${status}`);
    process.exit(1);
  } else {
    console.error(`Generation ended without a successful terminal status: ${status}`);
    process.exit(1);
  }
} catch (error) {
  const errorName = error instanceof Error ? error.name : "UnknownError";
  console.error(`Higgsfield request failed (${errorName}).`);
  process.exit(1);
}
