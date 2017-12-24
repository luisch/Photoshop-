main();

function clippingMask() {
    var desc3 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc3.putReference( charIDToTypeID('null'), ref2 );
    executeAction( charIDToTypeID('GrpL'), desc3, DialogModes.NO );
};

function createNewLayer(base, name)
{
	var l = activeDocument.artLayers.add();
	l.move(base, ElementPlacement.PLACEBEFORE);
	l.name = name;
	return l;
}

function main()
{
	if(!documents.length) return;
	if(activeDocument.activeLayer.kind != LayerKind.NORMAL) return;
	if(activeDocument.activeLayer.isBackgroundLayer) return;
	
	var baseLayer = activeDocument.activeLayer;
	var groupName = baseLayer.name;
	var newGroup = activeDocument.layerSets.add();
	newGroup.name = "color("+baseLayer.name+")";
	newGroup.move(baseLayer, ElementPlacement.PLACEAFTER);
	
	var base = activeDocument.artLayers.add();
	base.move(newGroup, ElementPlacement.PLACEATEND);
	base.name = "ベースカラー";
	
	createNewLayer(base,"落ち影");
	clippingMask();
	createNewLayer(base,"照り返し");
	createNewLayer(base,"バックキー");
	createNewLayer(base,"サイド・キー").blendMode = BlendMode.SCREEN;
	createNewLayer(base,"メイン・ライト").blendMode = BlendMode.SCREEN;
	createNewLayer(base,"スカイ・ライト").blendMode = BlendMode.SCREEN;
}
