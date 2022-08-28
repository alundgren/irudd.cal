export default function generateItemId() 
{ 
    return Math.random().toString(36).substring(2, 8);
}