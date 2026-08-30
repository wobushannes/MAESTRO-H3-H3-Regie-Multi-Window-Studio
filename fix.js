const fs = require('fs');
let code = fs.readFileSync('./src/utils/promptCompiler.ts', 'utf8');

// I will just re-apply my manual edit from before the sed!
// Actually, since I ran sed, the file is corrupted. 
// I can fix the corruption by replacing the exact corrupted string.

code = code.replace(/const promptText = \(win\.prompt \|\| state\.rawConcept \|\| 'Dynamic cinematic scene sequence'\)\.trim\(\);      let refinedText = promptText;      if \(\!\/angle\|establishing\|overhead\|close\-up\|wide\|over\-the\-shoulder\|dutch\/i\.test\(refinedText\)\) \{          refinedText = "Establishing shot, clean single-subject composition with foreground layering and environmental depth. " \+ refinedText;      \}      const lensText = state\.lensStyle \? state\.lensStyle\.replace\(\/\^\(Lens \\const promptText = \(win\.prompt \|\| state\.rawConcept \|\| 'Dynamic cinematic scene sequence'\)\.trim\(\); Render\|Lens\):\\s\*\/\i, ""\) : "50 mm anamorphic lens";      const actionText = \`\$\{styleCode\} depicts a live-action cinematic scene in a native 16:9 widescreen frame, photographed on a \$\{lensText\} with motivated tungsten practical lighting, cool window fill, realistic skin texture, shallow depth of field, fine 35 mm grain, subtle halation and controlled highlight rolloff. No cuts; one continuous shot throughout. \$\{refinedText\}\`;      let winLine = \`window\$\{win\.windowNumber\}: \(\$\{precisionRange\}\) \[\$\{styleCode\}\] \[Category: \$\{catLabel\}\] \[Person: \$\{personLabel\}\] Action: \$\{promptText\}\`;/, `const promptText = (win.prompt || state.rawConcept || 'Dynamic cinematic scene sequence').trim();
      let refinedText = promptText;
      if (!/angle|establishing|overhead|close-up|wide|over-the-shoulder|dutch/i.test(refinedText)) {
          refinedText = "Establishing shot, clean single-subject composition with foreground layering and environmental depth. " + refinedText;
      }
      const lensText = state.lensStyle ? state.lensStyle.replace(/^(Lens & Render|Lens):\\s*/i, "") : "50 mm anamorphic lens";
      const actionText = \`\${styleCode} depicts a live-action cinematic scene in a native 16:9 widescreen frame, photographed on a \${lensText} with motivated tungsten practical lighting, cool window fill, realistic skin texture, shallow depth of field, fine 35 mm grain, subtle halation and controlled highlight rolloff. No cuts; one continuous shot throughout. \${refinedText}\`;
      let winLine = \`window\${win.windowNumber}: (\${precisionRange}) [\${styleCode}] [Category: \${catLabel}] [Person: \${personLabel}] Action: \${actionText}\`;`);

fs.writeFileSync('./src/utils/promptCompiler.ts', code);
