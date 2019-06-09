package main;

//Graphical Imports
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

//Frame Render Imports
import javax.swing.ImageIcon;
import javax.swing.JApplet;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JMenu;
import javax.swing.JMenuItem;

//Listener Imports
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

//Superior Imports
import java.util.ArrayList;

public class TEAPI implements MouseListener, MouseWheelListener, ActionListener
{
//////////////////////////////////////////////
// Setup
//////////////////////////////////////////////
	//Definitions
		//Window
			//Size
				static final int X = 800;
				static final int Y = 600;
			//Components
				static JApplet frame = new JApplet();
				static JLabel label;
				static JMenuBar menuBar = new JMenuBar();
				static BufferedImage image = new BufferedImage(X, Y, BufferedImage.TYPE_INT_RGB);
				static Graphics2D g = image.createGraphics();
				public JMenu feedTab = new JMenu("Feed");
					public JMenuItem BPT = new JMenuItem("Import Brown Paper Tickets");
					public JMenuItem CMA = new JMenuItem("Import Catamount Arts");
					public JMenuItem clearBuffer = new JMenuItem("Clear Buffer");
		//Fonts
			static Font button = new Font("Verdana",Font.BOLD,32);
		//Misc
			static ArrayList<Production> bufferedShows = new ArrayList<Production>();
	
	//Adds Listeners & Creates Menu Bar
	public TEAPI() 
	{
		init();
		feedTab.add(BPT);feedTab.add(CMA);feedTab.add(clearBuffer);
		menuBar.add(feedTab);
		addListeners();
	}
	public static void main(String[]args) {@SuppressWarnings("unused") TEAPI enableListeners = new TEAPI();}
	public void init()
	{
		//Window Setup
			frame.setLocation(40, 40);
			label = new JLabel(new ImageIcon(image));
			frame.add(label);
			frame.setVisible(true);
			frame.setJMenuBar(menuBar);
			//Test Productions, remove in later versions
				//Test Production 1
				//Test Production 2
				Production p2 = new Production();
				p2.setTitle("Shaq Eats At Buca's");
				p2.setTagline("Buca di Beppo");
				p2.setFirst_performance("June 2019");
				p2.setLast_performance("July 2019");
				p2.setDescription("Former NBA pro basketball player Shaquille O'Neal dines at Italian franchising restaurant Buca di Beppo.");
				bufferedShows.add(p2);
				//Test Production 3 (Blank)
				Production p3 = new Production();
				bufferedShows.add(p3);
			//Main Loop
			while (true) 
			{
				updateGraphics();
				try{Thread.sleep(16);}
				catch(Exception e) {}
			}
	}
	
//////////////////////////////////////////////
// Main Logic
//////////////////////////////////////////////
	
	static void interpretBPT(){}//Brown Paper Tickets Interpreter	
	static void interpretCMA()//Catamount Arts Interpreter
	{
		//////////////////////////////////////////////
		//Useful Tags
		//////////////////////////////////////////////
			//<Show> 													= Create Show Object
			//<ShowId> & </ShowId> 										= A reference ID, may be helpful for duplicate checking			
			//<LocalId> & </LocalId> 									= Also a reference ID
			//<LongMinutes> & </LongMinutes> 							= Show length in minutes
			//<Name> & </Name> 											= Name of the show
			//</Show> 													= Done with Show Object [may or may not be useful]
			//<ShowTypeId> & </ShowTypeId> 								= May correspond to a way we can figure out if it is a theater show (if not theater -> skip)
			//<Genres> & </Genres>										= Potential alternative to ShowTypeId	
			//<ActiveFrom> & </ActiveFrom>								= Start Time
			//<ActiveTo> & </ActiveTo>									= End Time
			//<BriefText> & </BriefText>								= Description of the show
			//<DirectLink> & </DirectLink>								= A link to the show info webpage
	}
	
//////////////////////////////////////////////
// Window Graphics
//////////////////////////////////////////////
	//Draws Window Graphics
	static void updateGraphics() 
	{
		clear(g);
		drawUI(g);
		label.paintImmediately(0, 0, X, Y);
	}
	//Clears Window Graphics
	static void clear(Graphics g){g.setColor(Color.WHITE);g.fillRect(0, 0, 800, 600);}
	//Draws the UI elements of the window
	static void drawUI(Graphics g)
	{
		//Permanent Functionality Elements
			//Window Outline
				g.setColor(Color.BLACK);
				g.drawRect(0,0,799,599);
		//Conditional Functionality Elements 
			if(bufferedShows.size()!=0)//(Shows are in queue)
			{
				//Accept & Deny Buttons
					g.setFont(button);
					//Accept
						g.setColor(Color.GREEN);
						g.fillRect(400,535,399,64);
						g.setColor(Color.WHITE);
						g.drawString("Accept Show",484,574);
					//Deny
						g.setColor(Color.RED);
						g.fillRect(1,535,398,64);
						g.setColor(Color.WHITE);
						g.drawString("Deny Show",96,574);
					//Spacer Outlines
						g.setColor(Color.BLACK);
						g.drawLine(399,534,399,600);
						g.drawLine(0,534,800,534);
				//Draw Production Info
					g.drawLine(220, 0, 220, 534);
					Font text = new Font("Verdana",0,24);
					g.setFont(text);
					int yPos = 40;
					String category[];
					
					if (bufferedShows.get(0).getTitle() != null)
					{
						category = bufferedShows.get(0).getTitle().split(" ");
						g.drawString("TITLE",10,yPos);
						yPos = wrapText(g, bufferedShows.get(0), category, yPos, false);
					}
					if (bufferedShows.get(0).getTagline() != null)
					{
						category = bufferedShows.get(0).getTagline().split(" ");
						g.drawString("TAGLINE",10,yPos);
						yPos = wrapText(g, bufferedShows.get(0), category, yPos, false);
					}
					if (bufferedShows.get(0).getFirst_performance() != null)
					{
						category = new String[3];
						category[0] = bufferedShows.get(0).getFirst_performance();
						category[1] = "-";
						category[2] = bufferedShows.get(0).getLast_performance();
						g.drawString("DATES",10,yPos);
						yPos = wrapText(g, bufferedShows.get(0), category, yPos, false);
					}
					if (bufferedShows.get(0).getDescription() != null)
					{
						category = bufferedShows.get(0).getDescription().split(" ");
						g.drawString("DESCRIPTION",10,yPos);
						yPos = wrapText(g, bufferedShows.get(0), category, yPos, true);
					}
			}
			else
			{
				g.setFont(button);
				g.drawString("No shows currently in buffer", 140, 260);
				g.drawString("Please import an RSS feed", 160, 295);
			}
	}	
	//Helper function for drawUI, wraps text and returns starting y position of next text group
	static int wrapText(Graphics g, Production p, String cat[], int y, boolean last)
	{
		int xPos = 230;
		int yPos = y;
		for (int i=0; i<cat.length; i++)
		{
			if ((800 - (xPos + g.getFontMetrics().stringWidth(cat[i]))) < 12)
			{
				xPos = 230;
				yPos += 28;
			}
			g.drawString(cat[i], xPos, yPos);
			xPos += g.getFontMetrics().stringWidth(cat[i]) + 7;
		}
		if (!last)
		{
			yPos += 12;
			g.drawLine(0, yPos, 800, yPos);
			yPos += 28;
		}
		return yPos;
	}
	
//////////////////////////////////////////////
// Listeners
//////////////////////////////////////////////
	//Adds listeners to window
	void addListeners() 
	{
		frame.addMouseListener(this);
		frame.addMouseWheelListener(this);
		BPT.addActionListener(this);
		CMA.addActionListener(this);
		clearBuffer.addActionListener(this);
	}
	//Handles mouse click events
	public void mouseClicked(MouseEvent e) 
	{
		Rectangle rect = new Rectangle(e.getX()-3,e.getY()-36,1,1);//Mouse Click Rectangle Setup (accounts for pre-made sidebar offset & Menu Bar)
		if(bufferedShows.size()!=0)// Shows are in queue
		{
			//Accept & Deny Buttons
			if(rect.intersects(400,535,399,64)){System.out.println("Show Accepted"); bufferedShows.remove(0);}//Accept
			else if(rect.intersects(1,535,398,64)){System.out.println("Show Denied"); bufferedShows.remove(0);}//Deny
		}
	}
	//Handles mousewheel events
	public void mouseWheelMoved(MouseWheelEvent m) {}//FIXME: Used for scrolling on webpage image
	
	//Handles Menubar events
	public void actionPerformed(ActionEvent a)
	{
		if(a.getActionCommand().equals("Import Brown Paper Tickets"))
		{
			bufferedShows.clear();
			//FIXME: Put import/interpret method calls for BPT here.
		}
		else if(a.getActionCommand().equals("Import Catamount Arts"))
		{
			bufferedShows.clear();
			//FIXME: Put import/interpret method calls for Catamount Arts here.
		}
		else if(a.getActionCommand().equals("Clear Buffer")){bufferedShows.clear();}		
	}
//////////////////////////////////////////////
// Extraneous Implementations
//////////////////////////////////////////////
	public void mouseEntered(MouseEvent m) {}
	public void mouseExited(MouseEvent m) {}
	public void mousePressed(MouseEvent m) {}
	public void mouseReleased(MouseEvent m) {}
}