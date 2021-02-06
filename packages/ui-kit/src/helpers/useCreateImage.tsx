import * as React from 'react';

export const useCreateImage = (
  url: string,
): {
  image: HTMLImageElement;
  loading: boolean;
  error: ErrorEvent;
} => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorEvent>();
  const [image, setImage] = React.useState<HTMLImageElement>(null);

  React.useEffect(() => {
    setLoading(true);
    let cancel = false;

    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
    }).then(
      (res) => {
        if (cancel) return;
        setLoading(false);
        setImage(res);
      },
      (error) => {
        if (cancel) return;
        setLoading(false);
        setError(error);
      },
    );
    return () => {
      cancel = true;
    };
  }, [url]);

  return { image, loading, error };
};
