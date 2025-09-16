import { ESOA } from '../types/eSOA';

const createAttributes = (obj: any): string => {
  return Object.entries(obj)
    .filter(([key, value]) => key.startsWith('p') && value !== undefined)
    .map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
    .join(' ');
};

const escapeXml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const processNode = (nodeName: string, data: any): string => {
  if (data === null || data === undefined) {
    return `<${nodeName}/>`;
  }

  if (Array.isArray(data)) {
    return data.map(item => processNode(nodeName, item)).join('\n');
  }

  if (typeof data === 'object') {
    const attributes = createAttributes(data);
    const children = Object.entries(data)
      .filter(([key]) => !key.startsWith('p'))
      .map(([key, value]) => processNode(key, value))
      .join('\n');
    
    const attrStr = attributes ? ` ${attributes}` : '';
    return children
      ? `<${nodeName}${attrStr}>\n${children}\n</${nodeName}>`
      : `<${nodeName}${attrStr}/>`;
  }

  return `<${nodeName}>${escapeXml(String(data))}</${nodeName}>`;
};

export const cleanJsonData = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(cleanJsonData).filter(item => item !== null && item !== undefined);
  }
  
  if (typeof data === 'object' && data !== null) {
    const cleaned: { [key: string]: any } = {};
    
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (value !== null && value !== undefined && value !== '') {
          cleaned[key] = cleanJsonData(value);
        }
      }
    }
    
    return cleaned;
  }
  
  return data;
};

export const jsonToXml = (obj: any): string => {
  // Ensure the root element is eSOA
  const esoaData: ESOA = obj;
  return `<?xml version="1.0" encoding="utf-8"?>\n${processNode('eSOA', esoaData)}`;
};

// Helper function to validate eSOA structure
export const validateESOAStructure = (data: any): boolean => {
  try {
    // Basic structure validation
    if (!data.pHciPan || !data.pHciTransmittalId) {
      return false;
    }

    // Check for required sections
    const requiredSections = ['SummaryOfFees', 'ProfessionalFees', 'ItemizedBillingItems'];
    return requiredSections.every(section => data.hasOwnProperty(section));
  } catch (error) {
    return false;
  }
};