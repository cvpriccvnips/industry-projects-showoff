package external;

public class ExternalAPIFactory {
  private static final String DEFAULT_PIPELINE = "ticketmaster";//改这个字符就能改api-->factory的作用

  // Start different APIs based on the pipeline.
  public static ExternalAPI getExternalAPI(String pipeline) {
    switch (pipeline) {
      case "ticketmaster":
        return new TicketMasterAPI();
      default:
        throw new IllegalArgumentException("Invalid pipeline " + pipeline);
    }
  }

  public static ExternalAPI getExternalAPI() {
    return getExternalAPI(DEFAULT_PIPELINE);
  }
}
