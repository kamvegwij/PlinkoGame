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
        a.vy *= 0.01;
        a.vx -= 0.01;
    }

    navigate_path(a, x_pos, y_pos)
    {
        //a.vy += 0.08; 

        if (a.x > x_pos && a.y < y_pos)
        {
            a.x -= 0.25;
            a.y += 0.25;
            // a.vx -= 0.01;
            //a.vy += 0.01;
        }

        else if (a.x < x_pos && a.y < y_pos)
        {
            a.x += 0.25;
            a.y += 0.25;
            //a.vx += 0.01;
           // a.vy += 0.01;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0;
            a.y += 0.25;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0.25;
            a.y += 0;
        }
    }
}