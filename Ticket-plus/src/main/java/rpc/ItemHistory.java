package rpc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import entity.Item;
import security.SecurityFactory;

/**
 * Servlet implementation class ItemHistory
 */
@WebServlet("/history")
public class ItemHistory extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ItemHistory() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String userName = request.getParameter("user_name");
		String jwtCode = request.getParameter("jwtCode"); 
		JSONArray array = new JSONArray(); 
		String jwtResult = SecurityFactory.parseJWT(jwtCode); 
		
		if (jwtResult.equals("Authentication Success.")) {
			JSONObject obj = new JSONObject();
			try {
				obj.put("jwtResult", jwtResult); 
				array.put(obj); 
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			
			
			DBConnection conn = DBConnectionFactory.getConnection();
			Set<Item> items = conn.getFavoriteItems(userName);
			conn.close(); 
			for (Item item : items) {
				obj = item.toJSONObject();
				try {
					obj.append("favorite", true);
				} catch (JSONException e) {
					e.printStackTrace();
				}
				array.put(obj);
			}
			RpcHelper.writeJsonArray(response, array);
		} else {
			try {
				JSONObject obj = new JSONObject(); 
				obj.put("jwtResult", jwtResult);
				
				array.put(obj); 
				RpcHelper.writeJsonArray(response, array);
			} catch (Exception e) {
				e.printStackTrace(); 
			}
			 
		}

		

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			JSONObject input = RpcHelper.readJsonObject(request);
			String userName = input.getString("user_name");
			
			
			JSONArray array = input.getJSONArray("favorite");
			List<String> itemIds = new ArrayList<>();
			for (int i = 0; i < array.length(); ++i) {
				itemIds.add(array.get(i).toString());
			}
			
			DBConnection conn = DBConnectionFactory.getConnection();
			conn.setFavoriteItems(userName, itemIds);
			conn.close();
			
			RpcHelper.writeJsonObject(response,
					new JSONObject().put("result", "SUCCESS"));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try {
			JSONObject input = RpcHelper.readJsonObject(request);
			String userName = input.getString("user_name");
			
			JSONArray array = input.getJSONArray("favorite");
			List<String> itemIds = new ArrayList<>();
			for (int i = 0; i < array.length(); ++i) {
				itemIds.add(array.get(i).toString());
			}
			
			DBConnection conn = DBConnectionFactory.getConnection();
			conn.unsetFavoriteItems(userName, itemIds);
			conn.close();
			
			RpcHelper.writeJsonObject(response,
					new JSONObject().put("result", "SUCCESS"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
