import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(
    new URL("../src/components/projects/DeleteProjectButton.tsx", import.meta.url),
    "utf8"
);
const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function findElement(element, predicate) {
    if (!React.isValidElement(element)) {
        return null;
    }
    if (predicate(element)) {
        return element;
    }
    for (const child of React.Children.toArray(element.props.children)) {
        const found = findElement(child, predicate);
        if (found) {
            return found;
        }
    }
    return null;
}

function createDialog() {
    const calls = [];
    const dialog = {
        showModal() { calls.push("open"); },
        close() { calls.push("close"); },
        getBoundingClientRect() { return { left: 100, right: 300, top: 100, bottom: 300 }; },
    };
    const cancelButton = { focus() { calls.push("focus cancel"); } };
    const refs = [{ current: dialog }, { current: cancelButton }];
    const loaded = { exports: {} };
    const dependencies = {
        react: { useRef: () => refs.shift() },
        "@/src/lib/projects/projects-actions": {
            deleteProject: (id) => { calls.push(`delete ${id}`); },
        },
    };
    function resolve(name) {
        if (name in dependencies) {
            return dependencies[name];
        }
        return require(name);
    }
    new Function("require", "module", "exports", code)(resolve, loaded, loaded.exports);
    return { tree: loaded.exports.default({ id: 42, title: "Test project" }), dialog, calls };
}

test("the dialog opens with safe focus and only submits on confirmation", () => {
    const { tree, calls } = createDialog();
    const trigger = findElement(tree, (element) => element.props["aria-label"] === "Delete Test project");
    const cancel = findElement(tree, (element) => element.type === "button" && element.props.children === "Cancel");
    const close = findElement(tree, (element) => element.props["aria-label"] === "Close delete confirmation");
    const form = findElement(tree, (element) => element.type === "form");

    trigger.props.onClick();
    cancel.props.onClick();
    trigger.props.onClick();
    close.props.onClick();
    assert.deepEqual(calls, ["open", "focus cancel", "close", "open", "focus cancel", "close"]);

    form.props.action(new FormData());
    assert.equal(calls.at(-1), "delete 42");
});

test("Escape and backdrop clicks close the dialog, but inside clicks do not", () => {
    const { tree, dialog, calls } = createDialog();
    const element = findElement(tree, (item) => item.type === "dialog");
    const click = (x, y, target = dialog) => element.props.onClick({
        target,
        currentTarget: dialog,
        clientX: x,
        clientY: y,
    });

    click(150, 150);
    click(50, 50, {});
    assert.deepEqual(calls, []);
    click(50, 50);
    assert.deepEqual(calls, ["close"]);

    let prevented = false;
    let stopped = false;
    element.props.onKeyDown({
        key: "Escape",
        preventDefault() { prevented = true; },
        stopPropagation() { stopped = true; },
    });
    assert.equal(prevented, true);
    assert.equal(stopped, true);
    assert.deepEqual(calls, ["close", "close"]);
});
