package security;

public class ApiKey {
	private static String apiKey = "123456789asdfghjkl"; 
	private static int ttMillis = 1000*60*15; 

	public static String getSecret() {
		return apiKey;
	}

	public static void setSecret(String apiKey) {
		ApiKey.apiKey = apiKey;
		
	}

	public static int getTtMillis() {
		return ttMillis;
	}

	public static void setTtMillis(int ttMillis) {
		ApiKey.ttMillis = ttMillis;
	}
	
}
