import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import types from "@babel/types";
import hashSum from "hash-sum";

export default (value, { cssReg, filename }) => {
  // { include: /\.(js|jsx|ts|tsx)$/ } F:\codes\react-app-ready\apps\mobile
  // console.log("value>>>", value);
  let hash = "";
  const ast = parser.parse(value, {
    sourceType: "module",
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-typescript",
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins: ["jsx", "typescript"],
  });

  const importNestVisitor = {
    StringLiteral(path) {
      if (cssReg.test(path.node.value)) {
        if (!hash) {
          hash = hashSum(filename);
        }
        // console.log("Identifier path>>>", id);
        path.replaceWith(
          types.stringLiteral(path.node.value + "?scoped=" + hash)
        );
      }
    },
  };

  traverse.default(ast, {
    ImportDeclaration(path) {
      path.traverse(importNestVisitor);
    },
    JSXOpeningElement(path) {
      if (hash) {
        path.node.attributes.push(
          types.jsxAttribute(types.jsxIdentifier(`data-v-${hash}`))
        );
      }
    },
  });
  const { code, map } = generate.default(ast, {}, value);
  /* if (filename.includes("Home")) {
    console.log("Home code>", code);
  } */
  return { code, map };
};
