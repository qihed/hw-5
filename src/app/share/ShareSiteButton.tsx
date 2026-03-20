"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Loader from "components/Loader";
import styles from "./share-page.module.scss";

function getSiteRootUrl(): string {
  if (typeof window === "undefined") return "";
  const { origin } = window.location;
  return origin.endsWith("/") ? origin : `${origin}/`;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to execCommand */
    }
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function ShareSiteButton() {
  const [busy, setBusy] = useState(false);

  const handleShare = useCallback(async () => {
    const url = getSiteRootUrl();
    if (!url) return;

    setBusy(true);
    try {
      const ok = await copyTextToClipboard(url);
      if (ok) {
        toast.success("Ссылка скопирована");
      } else {
        toast.error("Не удалось скопировать ссылку");
      }
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <motion.button
      type="button"
      className={styles.shareButton}
      onClick={handleShare}
      disabled={busy}
      whileHover={busy ? undefined : { y: -2 }}
      whileTap={busy ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {busy && <Loader className={styles.shareButtonLoader} size="s" />}
      Поделиться
    </motion.button>
  );
}
