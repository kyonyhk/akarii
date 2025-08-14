import React from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Enhanced markdown parser for Akarii messages
  const parseContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const paragraphText = currentParagraph.join(' ').trim();
        if (paragraphText) {
          elements.push(
            <p
              key={key++}
              className="app-paragraph2 text-white/80 mb-3 leading-relaxed"
            >
              {renderInlineFormatting(paragraphText)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key++} className="mb-4 space-y-1">
            {currentList.map((item, index) => (
              <li key={index} className="app-paragraph2 text-white/80 flex items-start gap-2">
                <span className="text-white/60 leading-none flex items-center h-[1.2em]">•</span>
                <span>{renderInlineFormatting(item)}</span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Empty line - flush current content
      if (!trimmedLine) {
        flushParagraph();
        flushList();
        return;
      }

      // H2 headers (## text)
      if (trimmedLine.startsWith('## ')) {
        flushParagraph();
        flushList();
        const headingText = trimmedLine.slice(3).trim();
        elements.push(
          <h2
            key={key++}
            className="text-lg font-semibold text-white mb-3 mt-5 first:mt-0"
          >
            {renderInlineFormatting(headingText)}
          </h2>
        );
        return;
      }

      // H3 headers (### text)
      if (trimmedLine.startsWith('### ')) {
        flushParagraph();
        flushList();
        const headingText = trimmedLine.slice(4).trim();
        elements.push(
          <h3
            key={key++}
            className="app-subheading text-white font-medium mb-2 mt-4 first:mt-0"
          >
            {renderInlineFormatting(headingText)}
          </h3>
        );
        return;
      }

      // Horizontal rule (---)
      if (trimmedLine === '---') {
        flushParagraph();
        flushList();
        elements.push(
          <hr key={key++} className="border-white/20 my-4" />
        );
        return;
      }

      // Table detection (| header | header |)
      if (trimmedLine.includes('|') && trimmedLine.split('|').length > 2) {
        flushParagraph();
        flushList();
        
        // Look ahead to check for table header separator (|---|---|)
        let tableRows: string[] = [trimmedLine];
        let nextIndex = index + 1;
        
        // Check if next line is a separator
        if (nextIndex < lines.length) {
          const nextLine = lines[nextIndex].trim();
          if (nextLine.match(/^\|[\s\-\|]+\|$/)) {
            // Skip the separator line
            nextIndex++;
          }
        }
        
        // Collect subsequent table rows
        while (nextIndex < lines.length) {
          const nextLine = lines[nextIndex].trim();
          if (nextLine.includes('|') && nextLine.split('|').length > 2) {
            tableRows.push(nextLine);
            nextIndex++;
          } else {
            break;
          }
        }
        
        if (tableRows.length > 1) {
          elements.push(renderTable(tableRows, key++));
          
          // Skip the lines we've processed
          for (let i = index + 1; i < nextIndex; i++) {
            lines[i] = ''; // Mark as processed
          }
        }
        return;
      }

      // Bullet points (• text)
      if (trimmedLine.startsWith('• ')) {
        flushParagraph();
        const listItem = trimmedLine.slice(2).trim();
        currentList.push(listItem);
        return;
      }

      // Bold heading (starts with ** and ends with **)
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
        flushParagraph();
        flushList();
        const headingText = trimmedLine.slice(2, -2);
        elements.push(
          <h3
            key={key++}
            className="app-subheading text-white font-medium mb-2 mt-4 first:mt-0"
          >
            {renderInlineFormatting(headingText)}
          </h3>
        );
        return;
      }

      // Regular content - add to current paragraph
      flushList();
      currentParagraph.push(trimmedLine);
    });

    // Flush any remaining content
    flushParagraph();
    flushList();

    return elements;
  };

  const renderTable = (rows: string[], key: number) => {
    const parseTableRow = (row: string) => {
      return row
        .split('|')
        .slice(1, -1) // Remove empty strings from start and end
        .map(cell => cell.trim());
    };

    const headerRow = parseTableRow(rows[0]);
    const dataRows = rows.slice(1).map(parseTableRow);

    return (
      <div key={key} className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse border border-white/20 rounded-lg">
          <thead>
            <tr className="bg-white/5">
              {headerRow.map((header, index) => (
                <th
                  key={index}
                  className="border border-white/20 px-3 py-2 text-left app-subheading text-white font-medium"
                >
                  {renderInlineFormatting(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-white/20 px-3 py-2 app-paragraph2 text-white/80"
                  >
                    {renderInlineFormatting(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderInlineFormatting = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const codeRegex = /`(.*?)`/g;
    let processedText = text;
    let key = 0;

    // Process bold text first
    let lastIndex = 0;
    let match;
    const tempParts: (string | React.ReactElement)[] = [];
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold part
      if (match.index > lastIndex) {
        tempParts.push(text.slice(lastIndex, match.index));
      }

      // Add bold part
      tempParts.push(
        <span
          key={key++}
          className="font-medium text-white"
        >
          {match[1]}
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      tempParts.push(text.slice(lastIndex));
    }

    // If we found bold formatting, return the processed parts
    if (tempParts.length > 0) {
      return tempParts;
    }

    // Otherwise return original text
    return text;
  };

  return (
    <div className="max-w-none">{parseContent(content)}</div>
  );
}
