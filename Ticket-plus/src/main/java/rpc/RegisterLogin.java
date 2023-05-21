package rpc;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import security.ApiKey;
import security.SecurityFactory;

/**
 * Servlet implementation class RegisterLogin
 */
@WebServlet("/registerLogin")
public class RegisterLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
		
		try {
			BufferedReader reader = request.getReader(); 
			StringBuffer jb = new StringBuffer(); 
			String line; 
			while ((line = reader.readLine()) != null) {
				jb.append(line); 
			}
			reader.close(); 
			
			System.out.println(jb.toString()); 
			
			JSONObject jsonObject = new JSONObject(jb.toString()); 
			
			String userName = jsonObject.getString("userName"); 
			String passWord = jsonObject.getString("passWord"); 
			String goal = jsonObject.getString("goal");
			String jwtCode = jsonObject.getString("jwtCode"); 
			
			//System.out.println(userName);
			//System.out.println(passWord);
			//System.out.println(goal);
			//System.out.println(jwtCode); 
			
			DBConnection conn = DBConnectionFactory.getConnection(); 
			
			if (goal.equals("signup")) {
				String determination = conn.registerNewUser(userName, passWord);
				
				if (determination == "The user name has already existed. ") {
					System.out.println(determination); 
				} else if (determination == "The user has been created. ") {
					System.out.println(determination); 
				} else {
					System.out.println(determination); 
				}
				
				JSONObject jsonObject1 = new JSONObject(); 
				jsonObject1.put("determination", determination); 
				jsonObject1.put("userName", userName);
				
				jwtCode = SecurityFactory.createJWT(userName, ApiKey.getTtMillis()); 
				jsonObject1.put("jwtCode", jwtCode); 
				
				RpcHelper.writeJsonObject(response, jsonObject1);
				
			} else if (goal.equals("login")) {
				boolean rs = conn.verifyLogin(userName, passWord);
				String determination; 
				
				if (!rs) {
					determination = "user name or password error"; 
					System.out.println(determination); 
				} else {
					determination = "Login success"; 
					System.out.println(determination); 
				} 
				
				JSONObject jsonObject1 = new JSONObject(); 
				jsonObject1.put("determination", determination); 
				jsonObject1.put("userName", userName);
				
				System.out.println(jsonObject1.toString()); 
				
				jwtCode = SecurityFactory.createJWT(userName, ApiKey.getTtMillis()); 
				jsonObject1.put("jwtCode", jwtCode);
				
				RpcHelper.writeJsonObject(response, jsonObject1); 
			}
		} catch (Exception e) {
		e.printStackTrace();
		}	
	}
}
