export class Physics
{
    #tag = "none"; 
    constructor(tag)
    {
        this.tag = tag;
    }

    get_tag()
    {
        return this.#tag;
    }

    is_colliding(a, b)
    {
        //returns a bool
    let obj1 = a.getBounds(); let obj2 = b.getBounds();

    let x_intercept = obj1.x + obj2.width > 
    obj2.x && obj1.x < obj2.x + obj2.width;

    let y_intercept = obj1.y + obj2.height > 
    obj2.y && obj1.y < obj2.y + obj2.height;

    if (x_intercept == true && y_intercept == true)
    {
        return true;
    }

    else
    {
        return false;
    }
    }

    bounce_object(a, b)
    {
        //we let a be the player and b the object it collides with
        if (is_colliding(a, b))
        {
            //lets get the exact point where the player has collided and send it the opposite way.
        }
    }
}