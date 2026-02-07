import React from 'react';

interface CredlyBadgeProps {
  badgeId: string;
}

const CredlyBadge: React.FC<CredlyBadgeProps> = ({ badgeId }) => {
  return (
    <div className="credly-embed" style={{ display: 'inline-block', }}>
      <iframe
        src={`https://www.credly.com/embedded_badge/${badgeId}`}
        width="150"
        height="270"
        frameBorder="0"
        title={`Credly Badge ${badgeId}`}
        allowTransparency={true}
      />
    </div>
  );
};

export default CredlyBadge;
