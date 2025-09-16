export const readEncryptedFile = async (file: File): Promise<{
  docMimeType: string;
  hash: string;
  key1: string;
  key2: string;
  iv: string;
  doc: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string') {
          throw new Error('Failed to read file content');
        }
        
        const data = JSON.parse(content);
        resolve({
          docMimeType: data.docMimeType || '',
          hash: data.hash || '',
          key1: data.key1 || '',
          key2: data.key2 || '',
          iv: data.iv || '',
          doc: data.doc || ''
        });
      } catch (error) {
        reject(new Error('Invalid encrypted file format'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};