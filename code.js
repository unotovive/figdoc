// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
console.log(figma.command);
if (figma.command === 'setting') {
    figma.showUI(__html__);
    figma.ui.onmessage = msg => {
        figma.closePlugin();
    };
}
else {
    const baseColor = figma.command === 'createDoc1' ? { type: "SOLID", color: { r: 0.4274, g: 0.6941, b: 0.3333 } } : figma.command === 'createDoc2' ? { type: "SOLID", color: { r: 0.8980, g: 0.2901, b: 0.4 } } : { type: "SOLID", color: { r: 0.3137, g: 0.5333, b: 0.8666 } };
    const titleColor = { type: "SOLID", color: { r: 1, g: 1, b: 1 } };
    const contentColor = { type: "SOLID", color: { r: 0.1176, g: 0.1176, b: 0.1176 } };
    const titleTextString = figma.command === 'createDoc1' ? '仕様捕捉のタイトルを入力' : figma.command === 'createDoc2' ? '一時メモのタイトルを入力' : '【ステータス】チケット番号 課題名';
    const subTitleTextString = 'サブタイトル1';
    const contentsTextString = 'AutoLayoutなのでメモとサブタイトルは増やすことができます';
    Promise.all([figma.loadFontAsync({ family: "Noto Sans JP", style: "Bold" }), figma.loadFontAsync({ family: "Noto Sans JP", style: "Regular" })]).then(() => {
        const textTitle = figma.createText();
        textTitle.fontName = {
            family: 'Noto Sans JP',
            style: 'Bold'
        };
        textTitle.fontSize = 40;
        textTitle.characters = titleTextString;
        textTitle.fills = [titleColor];
        const textSubTitle = figma.createText();
        textSubTitle.fontName = {
            family: 'Noto Sans JP',
            style: 'Bold'
        };
        textSubTitle.fontSize = 24;
        textSubTitle.characters = subTitleTextString;
        textSubTitle.fills = [contentColor];
        const textContents = figma.createText();
        textContents.fontName = {
            family: 'Noto Sans JP',
            style: 'Regular'
        };
        textContents.fontSize = 24;
        textContents.characters = contentsTextString;
        textContents.fills = [contentColor];
        const frameTitle = figma.createFrame();
        frameTitle.layoutMode = 'HORIZONTAL';
        frameTitle.primaryAxisAlignItems = 'MIN';
        frameTitle.counterAxisAlignItems = 'MIN';
        frameTitle.horizontalPadding = 20;
        frameTitle.verticalPadding = 8;
        frameTitle.itemSpacing = 8;
        frameTitle.primaryAxisSizingMode = 'FIXED';
        frameTitle.counterAxisSizingMode = 'AUTO';
        frameTitle.layoutAlign = 'STRETCH';
        frameTitle.fills = [baseColor];
        frameTitle.appendChild(textTitle);
        const frameContents = figma.createFrame();
        frameContents.layoutMode = 'VERTICAL';
        frameContents.primaryAxisAlignItems = 'MIN';
        frameContents.counterAxisAlignItems = 'MIN';
        frameContents.horizontalPadding = 20;
        frameContents.verticalPadding = 20;
        frameContents.itemSpacing = 12;
        frameContents.primaryAxisSizingMode = 'AUTO';
        frameContents.counterAxisSizingMode = 'FIXED';
        frameContents.layoutAlign = 'STRETCH';
        frameContents.appendChild(textSubTitle);
        frameContents.appendChild(textContents);
        const frameDoc = figma.createFrame();
        frameDoc.layoutMode = 'VERTICAL';
        frameDoc.primaryAxisAlignItems = 'MIN';
        frameDoc.counterAxisAlignItems = 'MIN';
        frameDoc.horizontalPadding = 0;
        frameDoc.verticalPadding = 0;
        frameDoc.itemSpacing = 0;
        frameDoc.strokes = [baseColor];
        frameDoc.strokeWeight = 5;
        frameDoc.cornerRadius = 20;
        frameDoc.clipsContent = true;
        frameDoc.primaryAxisSizingMode = 'AUTO';
        frameDoc.counterAxisSizingMode = 'AUTO';
        frameDoc.x = figma.viewport.center.x;
        frameDoc.y = figma.viewport.center.y;
        frameDoc.appendChild(frameContents);
        frameDoc.insertChild(0, frameTitle);
        const nodes = [];
        figma.currentPage.appendChild(frameDoc);
        nodes.push(frameDoc);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }).finally(() => {
        figma.closePlugin();
    });
}
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// figma.ui.onmessage = msg => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === 'createDoc1') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
