package main;

public class Production 
{
//////////////////////////////////////////////
//Stored Data
//////////////////////////////////////////////
	private String title;
	private boolean isPublic;
	private String tagline;
	private String description;
	private String first_performance;
	private String last_performance;
	
//////////////////////////////////////////////
//Get & Set
//////////////////////////////////////////////
	public boolean isPublic() {return isPublic;}
	public void setPublic(boolean isPublic) {this.isPublic = isPublic;}
	public String getTagline() {return tagline;}
	public void setTagline(String tagline) {this.tagline = tagline;}
	public String getDescription() {return description;}
	public void setDescription(String description) {this.description = description;}
	public String getFirst_performance() {return first_performance;}
	public void setFirst_performance(String first_performance) {this.first_performance = first_performance;}
	public String getLast_performance() {return last_performance;}
	public void setLast_performance(String last_performance) {this.last_performance = last_performance;}
	public void setTitle(String title) {this.title = title;}
	public String getTitle() {return title;}
}
