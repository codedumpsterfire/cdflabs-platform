import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin to inline Angular component templateUrl and styleUrls
 * Allows components to use external HTML/SCSS files in dev mode
 */
export function angularComponentsPlugin(): Plugin {
  return {
    name: 'vite-plugin-angular-components',
    enforce: 'pre',
    async transform(code: string, id: string) {
      // Only process TypeScript component files
      if (!id.includes('/app/') || !id.endsWith('.component.ts')) {
        return null;
      }

      let modified = code;

      // Inline templateUrl
      const templateUrlMatch = modified.match(/templateUrl\s*:\s*['"`](.*?)[`"']/);
      if (templateUrlMatch) {
        const templatePath = templateUrlMatch[1];
        const fullPath = path.resolve(path.dirname(id), templatePath);
        
        try {
          const template = fs.readFileSync(fullPath, 'utf-8');
          const escapedTemplate = template
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$\{/g, '\\${');
          
          modified = modified.replace(
            /templateUrl\s*:\s*['"`].*?[`"']\s*,/,
            `template: \`${escapedTemplate}\`,`
          );
        } catch (err) {
          console.warn(`Failed to load template ${fullPath}:`, err);
        }
      }

      // Inline styleUrls
      const styleUrlsMatch = modified.match(/styleUrls\s*:\s*\[(.*?)\]/s);
      if (styleUrlsMatch) {
        const urlsString = styleUrlsMatch[1];
        const styleUrls = urlsString.match(/['"`](.*?)[`"']/g) || [];
        const styleContents: string[] = [];

        for (const urlMatch of styleUrls) {
          const stylePath = urlMatch.slice(1, -1);
          const fullPath = path.resolve(path.dirname(id), stylePath);
          
          try {
            const style = fs.readFileSync(fullPath, 'utf-8');
            const escapedStyle = style
              .replace(/\\/g, '\\\\')
              .replace(/`/g, '\\`')
              .replace(/\$\{/g, '\\${');
            styleContents.push(escapedStyle);
          } catch (err) {
            console.warn(`Failed to load style ${fullPath}:`, err);
          }
        }

        if (styleContents.length > 0) {
          const combinedStyles = styleContents.join('\n');
          modified = modified.replace(
            /styleUrls\s*:\s*\[.*?\]\s*,/s,
            `styles: [\`${combinedStyles}\`],`
          );
        }
      }

      if (modified !== code) {
        return {
          code: modified,
          map: null,
        };
      }

      return null;
    },
  };
}
