import { memo } from "react";

function MapSection({ content }) {
  if (!content) return null;

  const { src } = content;

  return (
    <section id="Map">
      <iframe
        src={src}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full border-0"
      ></iframe>
    </section>
  );
}

export default memo(MapSection);
