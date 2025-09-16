interface DecryptRequest {
  docMimeType: string;
  hash: string;
  key1: string;
  key2: string;
  iv: string;
  doc: string;
  pmcc: string;
  certificateId: string;
}

interface DecryptResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    result: string;
    success: boolean;
  };
  errorCode: string;
  timestamp: string;
  statusCode: string;
}

export const decryptXmlFile = async (encryptedData: DecryptRequest): Promise<string> => {
  try {
    const response = await fetch('http://172.30.1.2:8081/api/EClaims/mock-decypted-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(encryptedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: DecryptResponse = await response.json();

    if (!result.success || !result.data.success) {
      throw new Error(result.message || 'Failed to decrypt the file');
    }

    return result.data.result;
  } catch (error) {
    throw new Error(`Failed to decrypt file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};