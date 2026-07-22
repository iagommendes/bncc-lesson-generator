/**
 * Flag de build para GitHub Pages / preview estático.
 * `NEXT_PUBLIC_*` é inlined no bundle do cliente.
 */
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
