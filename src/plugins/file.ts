export const fileToBase64 = (file: File) =>
  new Promise((resolve: (value: string) => void, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result != 'string') reject();
      else resolve(reader.result);
    };
    reader.onerror = reject;
  });

export const fileFromBase64 = (url: string, name: string) => {
  const element = document.createElement('a');
  element.href = url;
  element.target = '_parent';
  element.download = name;
  document.body.appendChild(element);
  element.dispatchEvent(new MouseEvent('click'));
  element.parentNode?.removeChild(element);
};
