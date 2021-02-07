import * as React from 'react';

export function useCreateImage(
  url: string,
): {
  image: HTMLImageElement;
  loading: boolean;
  error: Error;
} {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>(null);
  const [image, setImage] = React.useState<HTMLImageElement>(null);

  React.useEffect(() => {
    let cancel = false;
    if (url) {
      setLoading(true);

      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      }).then(
        (res) => {
          if (cancel) return;
          setLoading(false);
          setImage(res);
          cancel = true;
        },
        (error: Error) => {
          console.log(typeof error);
          const e = JSON.stringify(error, ['message', 'arguments', 'type', 'name']);
          const err = JSON.parse(e);
          console.log(err);
          if (cancel) return;
          setLoading(false);
          setError(err);
          cancel = true;
        },
      );
    }
    return () => {
      cancel = true;
    };
  }, [url]);

  return { image, loading, error };
}
