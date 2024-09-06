import React from "react";

interface LiteYoutubeProps {
  videoid: string;
  videotitle: string;
  posterquality?: string;
}

const LiteYoutube: React.FC<LiteYoutubeProps> = ({
  videoid,
  videotitle,
  posterquality,
}) => (
  <lite-youtube
    videoid={videoid}
    videotitle={videotitle}
    posterquality={posterquality}
  ></lite-youtube>
);

export default LiteYoutube;
