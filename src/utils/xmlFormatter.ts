export const formatXml = (xml: string): string => {
  // Remove escaped quotes and format the XML
  let formatted = xml
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '')
    .replace(/\\t/g, '  ');

  // Add proper indentation
  let indent = '';
  const tab = '  ';
  const lines = formatted.split('\n');
  const newLines = [];

  for (const line of lines) {
    if (line.match(/.+<\/\w[^>]*>$/)) {
      // Line contains an opening and closing tag
      newLines.push(indent + line);
    } else if (line.match(/^<\/\w/)) {
      // Line contains a closing tag
      indent = indent.substring(2);
      newLines.push(indent + line);
    } else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
      // Line contains an opening tag
      newLines.push(indent + line);
      indent += tab;
    } else {
      // Line contains self-closing tag or text
      newLines.push(indent + line);
    }
  }

  return newLines.join('\n');
};