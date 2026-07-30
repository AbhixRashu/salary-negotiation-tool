# Salary Pitch Generator - Fix Plan ✅

## Completed

- [x] Root cause analysis complete
- [x] Fix 1: `src/pages/api/generate.ts` & `generate-achievement.ts` - Fixed Gemini model name `gemini-3.5-flash-lite` → `gemini-2.5-flash-lite`
- [x] Fix 2: `src/pages/api/generate.ts` - Added AbortController timeout (25s) to `callGemini` and improved error handling
- [x] Fix 3: `src/pages/api/generate.ts` - Fixed `systemInstruction` format (removed `role: 'user'`)
- [x] Fix 4: `src/pages/api/polish.ts` - Already has AbortController timeout (25s) and correct systemInstruction format
- [x] Fix 5: `src/pages/pitch-assistant.astro` - Added visible error banner/state when API fails (loadingError div, dismiss button)
- [x] Fix 6: `src/pages/pitch-assistant.astro` - `isGenerating` resets properly; error messages for abort vs network errors; dismiss button generates template fallback
- [x] Verify and test changes

