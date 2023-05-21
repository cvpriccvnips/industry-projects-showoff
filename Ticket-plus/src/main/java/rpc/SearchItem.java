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
import org.json.JSONObject;

import db.DBConnection;
import db.DBConnectionFactory;
import entity.Item;
import security.SecurityFactory;

/**
 * Servlet implementation class SearchItem
 */
@WebServlet("/search")
public class SearchItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SearchItem() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		String userName = request.getParameter("user_name");
		double lat = Double.parseDouble(request.getParameter("lat"));
		double lon = Double.parseDouble(request.getParameter("lon"));
		String jwtCode = request.getParameter("jwtCode"); 
		//Term can be empty or null. 
		String term = request.getParameter("term");
		
		String jwtResult = SecurityFactory.parseJWT(jwtCode);
		List<JSONObject> list = new ArrayList<>();
		
		JSONObject obj = new JSONObject();
		try {
			obj.put("jwtResult", jwtResult); 
			list.add(obj); 
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		DBConnection conn = DBConnectionFactory.getConnection(); 
		List<Item> items = conn.searchItems(lat, lon, term); 
		
		Set<String> favorite = conn.getFavoriteItemIds(userName);
		conn.close();
		
		
		try {
			for (Item item : items) {
				// Add a thin version of item object
				JSONObject obj1 = item.toJSONObject();
				
				// Check if this is a favorite one.
				// This field is required by frontend to correctly display favorite items.
				obj1.put("favorite", favorite.contains(item.getItemId()));
				
				list.add(obj1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		JSONArray array = new JSONArray(list);
		RpcHelper.writeJsonArray(response, array);  
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
