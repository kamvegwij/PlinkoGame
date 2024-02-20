export class GameWorld
{
    #tag = "";

    constructor(w, h, x_pos, y_pos, tag)
    {
        this.w = w;
        this.h = h; 
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.tag = tag;
    }

    get_tag()
    {
        return this.#tag;
    }

    create_world_items(slot_node, app, src_img, arr_contain)
    {
        slot_node = PIXI.Sprite.from(src_img);
        slot_node.anchor.set(0.5);
        slot_node.width = this.w;
        slot_node.height = this.h;
        slot_node.x = this.x_pos;
        slot_node.y = this.y_pos;
        arr_contain.push(slot_node);

        app.stage.addChild(slot_node);
    }
}