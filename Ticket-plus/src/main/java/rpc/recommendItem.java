package rpc;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import algorithm.GeoRecommendation;
import entity.Item;
import security.SecurityFactory;

/**
 * Servlet implementation class recommendation
 */
@WebServlet("/recommendation")
public class recommendItem extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public recommendItem() {
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
			
			
			GeoRecommendation recommendation = new GeoRecommendation();
			List<Item> items = recommendation.recommendItems(userName, lat, lon);

			for (Item item : items) {
				array.put(item.toJSONObject());
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
		doGet(request, response);
	}

}
