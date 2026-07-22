public class main{
    public static void df(int ...n){
        for(int i : n){
            System.out.println(i);
        }
    }
    public static void main(String[] args) {
        df(10);
        df(223,422,42);
    }
}