import { useEffect, useState } from 'react';

function useWidth(props) {
  const [width, setWidth] = useState();
  useEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);
  return width;
}

export default useWidth;