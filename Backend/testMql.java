import java.sql.Connection;
import java.sql.DriverManager;

public class testMql {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/minhanh_db?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String pass = "admin12345";
        try (Connection conn = DriverManager.getConnection(url, user, pass)) {
            System.out.println("Kết nối thành công!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
