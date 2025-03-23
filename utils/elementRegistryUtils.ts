import React from 'react';
import { useNode } from '@craftjs/core';

// Global registry for element data
const elementRegistry: Record<string, Record<string, any>> = {};

/**
 * Register an element in the global registry.
 * @param id - The unique ID of the element.
 * @param element - The element object containing its attributes.
 */
export const registerElement = (id: string, element: Record<string, any>) => {
  elementRegistry[id] = element;
};

/**
 * Unregister an element from the global registry.
 * @param id - The unique ID of the element to unregister.
 */
export const unregisterElement = (id: string) => {
    delete elementRegistry[id];
  };

/**
 * Get an element's attribute from the global registry.
 * @param id - The unique ID of the element.
 * @param attribute - The attribute to retrieve.
 * @returns The value of the attribute, or null if not found.
 */
export const getElementAttribute = (id: string, attribute: string): any => {
  if (elementRegistry[id] && elementRegistry[id][attribute] !== undefined) {
    return elementRegistry[id][attribute];
  }
  return null;
};

/**
 * Replace element references in a script with their actual values.
 * @param script - The script containing element references (e.g., `$elementId.attribute`).
 * @returns The processed script with element references replaced.
 */
export const replaceElementReferences = (script: string): string => {
  return script.replace(/\$(\w+)\.(\w+)/g, (match, elementId, attribute) => {
    const value = getElementAttribute(elementId, attribute);
    return JSON.stringify(value);
  });
};

/**
 * Evaluate a script after replacing element references.
 * @param script - The script to evaluate.
 * @returns The result of the script evaluation, or null if an error occurs.
 */
export const evaluateScript = (script: string): any => {
  try {
    const processedScript = replaceElementReferences(script);
    // Use the Function constructor for safer evaluation
    return new Function(processedScript)();
  } catch (error) {
    console.error('Script evaluation error:', error);
    return null;
  }
};

/**
 * Hook to register a Craft.js element and its attributes.
 * @param id - The unique ID of the element.
 * @param attributes - The attributes of the element.
 */
export const useElementRegistry = (id: string, attributes: Record<string, any>) => {
  const { actions: { setProp } } = useNode((node) => ({
    attributes: node.data.props,
  }));

  // Register the element when it is rendered or updated
  React.useEffect(() => {
    registerElement(id, attributes);
  }, [id, attributes]);

  // Update the registry when attributes change
  React.useEffect(() => {
    registerElement(id, attributes);
  }, [attributes]);
};