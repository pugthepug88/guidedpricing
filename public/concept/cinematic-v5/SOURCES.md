# Cinematic Follow-Through V5 media

Final media namespace for `/concept/cinematic-follow-through-v5`.

## Hero worlds

| Stem | Profession | Selected source / cut |
| --- | --- | --- |
| `mechanic` | Automotive workshop | Keep the current approved Lovable mechanic benchmark. |
| `broker` | Mortgage broker | Pexels 8293313. Selected working range from the original: approx 1.3–5.0s. Professional explaining documents to a couple. |
| `agent` | Property / real estate | Pexels 7646399. Selected working range from the original: approx 1.3–6.6s. Agent actively touring a family through a house. |
| `construction` | Construction / high-value project contractor | Pexels 8964794. Selected working range from the original: approx 5.4–9.0s. Two project professionals reviewing plans and directing attention across an active site. |

## Supporting recognition worlds

| Stem | Profession | Selected clip |
| --- | --- | --- |
| `solar` | Solar installer | Pexels 8853484, short portrait installation loop. |
| `roofing` | Roofing contractor | User-selected `roofer.mp4`, use approx 0–4s from the approved master. |
| `personal-trainer` | Personal trainer | User-selected `personal trainer.mp4`, approved website cut approx 31–36.5s. |
| `photographer` | Photographer | User-selected `photographer.mp4`, approved website cut approx 0–5s. |
| `dentist` | Dentist | User-selected `Dentist.mp4`, approved website cut approx 0–5s. |

## Required output files

Each stem should ultimately have:

- `<stem>.mp4` — short web H.264, no audio, `faststart`
- `<stem>.jpg` — lightweight poster frame

The component currently prefers local files in this directory and only uses remote/existing-project fallbacks while final binaries are being transferred.

Keep colour normalisation subtle. The shared Zapla dark cinematic treatment remains CSS so it can be art-directed without re-encoding footage.
