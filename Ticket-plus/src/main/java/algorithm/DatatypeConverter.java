package algorithm;

import org.apache.tomcat.util.codec.binary.Base64;

public class DatatypeConverter {
	public static byte[] parseBase64Binary(String inputString) {
		byte[] byteArray = inputString.getBytes(); 
		byte[] encodedByteArray = Base64.encodeBase64(byteArray); 
		
		return encodedByteArray; 
	}
}
