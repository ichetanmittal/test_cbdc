const fs = require('fs');
const path = require('path');

// Class mappings from Bootstrap 4 to 5
const classMappings = {
    // Form controls
    'custom-control': 'form-check',
    'custom-checkbox': 'form-check',
    'custom-radio': 'form-check',
    'custom-switch': 'form-switch',
    'custom-select': 'form-select',
    'custom-file-input': 'form-control',
    'custom-file-label': 'form-label',
    'custom-file': 'form-file',
    'custom-range': 'form-range',
    
    // Data attributes
    'data-toggle': 'data-bs-toggle',
    'data-target': 'data-bs-target',
    'data-parent': 'data-bs-parent',
    'data-dismiss': 'data-bs-dismiss',
    'data-ride': 'data-bs-ride',
    'data-slide': 'data-bs-slide',
    'data-slide-to': 'data-bs-slide-to',
    'data-interval': 'data-bs-interval',
    'data-keyboard': 'data-bs-keyboard',
    'data-wrap': 'data-bs-wrap',
    
    // Utilities
    'float-left': 'float-start',
    'float-right': 'float-end',
    'text-left': 'text-start',
    'text-right': 'text-end',
    'font-weight-bold': 'fw-bold',
    'font-weight-bolder': 'fw-bolder',
    'font-weight-normal': 'fw-normal',
    'font-weight-light': 'fw-light',
    'font-weight-lighter': 'fw-lighter',
    'font-italic': 'fst-italic',
    'ml-': 'ms-',
    'mr-': 'me-',
    'pl-': 'ps-',
    'pr-': 'pe-',
    'border-left': 'border-start',
    'border-right': 'border-end',
    'rounded-left': 'rounded-start',
    'rounded-right': 'rounded-end',
};

// SCSS variable mappings
const scssVariableMappings = {
    // Form controls
    '$custom-control-indicator': '$form-check-indicator',
    '$custom-control-label': '$form-check-label',
    '$custom-select': '$form-select',
    '$custom-file': '$form-file',
    '$custom-range': '$form-range',
    
    // Colors and themes
    '$theme-colors': '(\n  "primary": $primary,\n  "secondary": $secondary,\n  "success": $success,\n  "info": $info,\n  "warning": $warning,\n  "danger": $danger,\n  "light": $light,\n  "dark": $dark\n)',
    
    // Spacing and positioning
    '$spacer': '1rem',
    '$enable-negative-margins': 'true',
    
    // Grid breakpoints
    '$grid-breakpoints': '(\n  xs: 0,\n  sm: 576px,\n  md: 768px,\n  lg: 992px,\n  xl: 1200px,\n  xxl: 1400px\n)',
};

// Creative Tim specific mappings
const creativeTimMappings = {
    // Variables
    '$opacity-8': 'rgba($white, 0.8)',
    '$opacity-5': 'rgba($white, 0.5)',
    '$opacity-2': 'rgba($white, 0.2)',
    '$transparent-bg': 'transparent',
    
    // Theme colors
    '$default': '$gray-600',
    '$primary': '$blue',
    '$secondary': '$gray-600',
    '$info': '$cyan',
    '$success': '$green',
    '$warning': '$yellow',
    '$danger': '$red',
    
    // States
    '$default-states': 'shade-color($default, 10%)',
    '$primary-states': 'shade-color($primary, 10%)',
    '$success-states': 'shade-color($success, 10%)',
    '$info-states': 'shade-color($info, 10%)',
    '$warning-states': 'shade-color($warning, 10%)',
    '$danger-states': 'shade-color($danger, 10%)',
};

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace class names
    for (const [oldClass, newClass] of Object.entries(classMappings)) {
        const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
        if (content.match(regex)) {
            content = content.replace(regex, newClass);
            modified = true;
        }
    }
    
    // Replace SCSS variables if it's a SCSS file
    if (filePath.endsWith('.scss')) {
        // First apply Bootstrap mappings
        for (const [oldVar, newVar] of Object.entries(scssVariableMappings)) {
            const regex = new RegExp(oldVar.replace('$', '\\$'), 'g');
            if (content.match(regex)) {
                content = content.replace(regex, newVar);
                modified = true;
            }
        }
        
        // Then apply Creative Tim specific mappings
        for (const [oldVar, newVar] of Object.entries(creativeTimMappings)) {
            const regex = new RegExp(oldVar.replace('$', '\\$'), 'g');
            if (content.match(regex)) {
                content = content.replace(regex, newVar);
                modified = true;
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (
            file.endsWith('.js') || 
            file.endsWith('.jsx') || 
            file.endsWith('.scss') || 
            file.endsWith('.html')
        ) {
            processFile(fullPath);
        }
    }
}

// Process the src directory
const srcDir = path.join(__dirname, 'src');
console.log('Starting Bootstrap 4 to 5 migration...');
processDirectory(srcDir);
console.log('Migration complete!');
