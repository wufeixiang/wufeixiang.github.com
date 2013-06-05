#!/usr/bin/perl -w
use strict;
use warnings;
use File::Copy ;
use Encode;
use XML::DOM;
use XML::Tidy::Tiny;

our $abs_dir = 'vision/' ;
our $xml_path = 'config.xml' ;
our $base_dir = 'photos';
our $photo_dir = $abs_dir.$base_dir ;

sub write_xml_header
{
    my $fileName = shift ;
    my @time = localtime;
    my $year = $time[5] + 1900 ;
    my $month = $time[4] + 1 ; 
    my $header = << "EOF";
<?xml version="1.0" encoding="utf-8"?>
    <xdb version="$year$month$time[3]">
      <xrs>
EOF

    open my $fd,"> $fileName" or die("write $fileName error");
    print $fd $header;
}

sub write_xml_footer
{
    my $fileName = shift ;
    my $header = << "EOF";
      </xrs>
   </xdb>
EOF

    open my $fd," >> $fileName" or die("write $fileName error");
    print $fd $header;
}

sub renamer
{
    my $file_path = shift;
    
    my $out_xml = "$file_path.xml";
    my $xml = "" ;
    my $id = 1 ;
    my $label = ""  ; 
    write_xml_header($out_xml);
    open my $fd ,">> $out_xml" or die("writeFile $out_xml Error");
    
    my @file_array = <$file_path/*.jpg> ;
    foreach my $file (@file_array)
    {
        $file =~ m{.+/(.+)\.jpg};
        $label = $1 ;
        $xml.="<rs><id>$id</id><label>$label</label><filename>$photo_dir/$file</filename></rs>\n";
        $id++ ;
    }
    print $fd encode("utf8",decode("gb2312",$xml));
    
    print "生成$out_xml成功\n";
    close $fd ;
    
    write_xml_footer($out_xml);
}

sub getSubDir
{
    my @dir_array ;
    my @tmp_array = <*> ;
    foreach my $filename (@tmp_array)
    {
        push (@dir_array ,$filename) if( -d $filename  ) ; 
    }
    return @dir_array ; 
}

sub main
{
    if( !chdir $base_dir )
    {
        die("切换目录$base_dir失败...");
    }
    
    my @sub_dirs = getSubDir($base_dir);
    foreach(@sub_dirs)
    {
        renamer($_);
    }
}

main();
