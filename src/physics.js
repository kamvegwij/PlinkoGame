export class Physics
{
    gravity = -9.8;
    friction = 2;
    collider; // the object we're colliding with;
    has_collided;

    constructor(gravity = -9.8, friction = 0.2)
    {
        this.gravity = gravity;
        this.friction = friction;
    }
    set_collider(b)
    {
        this.collider = b;
    }
    get_collider()
    {
        return this.collider;
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
            this.set_collider(b);
            b.scale.set(0.41, 0.41);
            return true;
        }

        else
        {
            b.scale.set(0.4, 0.4);
            return false;
        }
    }

    bounce_object(a, b)
    {
        //get the point where the objects collide and push the ball the opposite
        
        let distance = Math.sqrt((b.x-a.x)*(b.x-a.x) + (b.y-a.y)*(b.y-a.y));
        
        if (distance <= ((a.width + b.width) * (a.height + b.height)))

        { //they're overlapping or colliding.
            if (a.x <= b.x) 
            {
                if (a.y <= b.y)
                {
                    a.y -= 0.6;
                }
                else
                {
                    a.y += 0.6;
                }
               // a.y -= 2;
                //a.vy += 0.9;
                a.x -= 2;
            }
            else
            {
                if (a.y <= b.y) //vertical movement
                {
                    a.y -= 0.6;
                }
                else
                {
                    a.y += 0.6;
                }          
                //a.y -= 2;
                //a.vy *= 0.9;
                a.x += 2;
            }
        }
   
    } 

    move(a, x_pos, y_pos)
    {
        //this code maps out the path to the predetermined slot.
        if (a.x > x_pos && a.y < y_pos)
        {

            a.x -= 0.5;
            a.y += 0.5;
        }

        else if (a.x < x_pos && a.y < y_pos)
        {
            a.x += 0.5;
            a.y += 0.5;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0;
            a.y += 0.5;
        }
        
        else if (a.x == x_pos && a.y < y_pos)
        {
            a.x += 0.5;
            a.y += 0;
        } 
    }

    move_independent(a, x_pos, y_pos) //completely relies on the physics.
    {
        a.y += 0.5;
    }
}