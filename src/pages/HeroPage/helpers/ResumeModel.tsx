import { useEffect, useState } from "react";
import { convertToEmbedUrl } from ".";

const ResumeModal: React.FC<{ isOpen: boolean; onClose: () => void; resumeUrl: string }> = ({ isOpen, onClose, resumeUrl }) => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [canEmbed, setCanEmbed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const convertedUrl = convertToEmbedUrl(resumeUrl);
      setEmbedUrl(convertedUrl);

      // Check if it's a shortened link that can't be embedded
      if (resumeUrl.includes('1drv.ms')) {
        setCanEmbed(false);
      }
    }
  }, [isOpen, resumeUrl]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '90%',
          height: '90%',
          maxWidth: '1200px',
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 20px',
          backgroundColor: '#5315FC',
          color: 'white'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Resume - DhineshKumar Thirupathi
          </h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => window.open(resumeUrl, '_blank')}
              style={{
                backgroundColor: 'white',
                color: '#5315FC',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Open in New Tab
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {canEmbed ? (
            <>
              <iframe
                src={embedUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: 'white'
                }}
                title="Resume PDF Viewer"
                allow="autoplay"
              />

              {/* Loading/Fallback message */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                maxWidth: '400px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #5315FC',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <p style={{
                  fontSize: '16px',
                  color: '#333',
                  marginBottom: '15px',
                  fontWeight: '500'
                }}>
                  Loading Resume...
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  If the resume doesn't load within a few seconds,<br />
                  please click "Open in New Tab" button above.
                </p>
              </div>
            </>
          ) : (
            // Message for shortened links that can't be embedded
            <div style={{
              textAlign: 'center',
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              maxWidth: '500px'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>📄</div>
              <h3 style={{
                color: '#5315FC',
                marginBottom: '15px',
                fontSize: '20px'
              }}>
                Resume Ready to View
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#666',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                This resume is hosted on OneDrive. Please click the button below to view it in a new tab.
              </p>
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                style={{
                  backgroundColor: '#5315FC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 30px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#4012d4';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#5315FC';
                }}
              >
                View Resume →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};


export default ResumeModal;