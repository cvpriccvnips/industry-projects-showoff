package security;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.*;


public class SecurityFactory {
	
	//Generate a JSON Web Token
	public static String createJWT(String userName, long ttlMillis) {
		 
	    //The JWT signature algorithm we will be using to sign the token
	    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	 
	    long nowMillis = System.currentTimeMillis();
	    Date now = new Date(nowMillis);
	 
	    //We will sign our JWT with our ApiKey secret
	    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(ApiKey.getSecret());
	    //System.out.println(apiKeySecretBytes);
	    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	    //System.out.println(signingKey.getEncoded());
	 
	    //Let's set the JWT Claims
	    Claims claims = Jwts.claims(); 
	    claims.put("userName", userName); 
	    
	    JwtBuilder builder = Jwts.builder(); 
	     
	    
	    
	    builder.setClaims(claims); 
	    builder.setIssuedAt(now); 
	    builder.signWith(signatureAlgorithm, signingKey);
	 
	    //if it has been specified, let's add the expiration
	    if (ttlMillis >= 0) {
	    long expMillis = nowMillis + ttlMillis;
	        Date exp = new Date(expMillis);
	        builder.setExpiration(exp);
	    }
	 
	    //Builds the JWT and serializes it to a compact, URL-safe string
	    return builder.compact();
	}
	
	public static String parseJWT(String jwt) {
		 
	    //This line will throw an exception if it is not a signed JWS (as expected)
		try {
			Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(ApiKey.getSecret())).parseClaimsJws(jwt).getBody();
			
			Date expirationDate = claims.getExpiration(); 
			long nowMillis = System.currentTimeMillis();
		    Date now = new Date(nowMillis);
			
			if ((now.compareTo(expirationDate)) >= 0) {
				System.out.println("Expiration: " + claims.getExpiration());
				return "Login Expiration."; 
			}else {
				return "Authentication Success."; 
			}
		} catch(Exception e) {
			return "Jwt is not matched."; 
		}
	    
	}
	
	/*public static void main(String[] args) {
		//String coding = SecurityFactory.createJWT("123", ApiKey.getTtMillis()); 
		//System.out.println(coding); 
		//String codingResult = parseJWT(coding); 
		//System.out.println(codingResult);
	}*/
	
}
